import { Plugin, listen, respond, help, permissionGroup, PropTypes as T } from '@exoplay/exobot';
import clark from 'clark';

export const nameToId = (name) => {
  return name.trim().replace(/[^\w]/g, '').toLowerCase();
};

const POINT_REGEX = /^([\s\w@.\-']+):?\s*([\+\-]{2})(?:\s+for (.*))?$/;
const REPEAT_REGEX = /^([\+\-]{2})(?:\s+for (.*))?$/;

export default class Points extends Plugin {
  static type  = 'points';
  static propTypes = {
    spamTimeoutSeconds: T.number.isRequired,
  };

  static defaultProps = {
    spamTimeoutSeconds: 60 * 5,
  };

  defaultDatabase = { points: { things: {}, tops: [] } };
  recentVotes = {};
  lastVote = {};

  isSpam(userName, thing) {
    const recentVotes = this.recentVotes[userName];

    if (!recentVotes) {
      this.recentVotes[userName] = {};
    }

    const recentVote = this.recentVotes[userName][thing];
    const now = Date.now();

    if (!recentVote) {
      this.recentVotes[userName][thing] = now;
      return false;
    }

    const diff = (now - recentVote) / 1000;

    if (diff < this.options.spamTimeoutSeconds) {
      return true;
    }
  }

  @permissionGroup('points');
  @help('thing++ or thing-- to add or remove points. Optionally, "thing++ for <reason>"');
  @listen(POINT_REGEX);
  async changePoints ([, name, change, reason], message) {
    this.lastVote[message.channel] = { name, change, reason };

    if (this.isSpam(message.user.name, name)) {
      return;
    }

    const id = nameToId(name);

    let points = this.bot.db.get(`points.things.${id}`).value();

    if (!points) { points = this.buildPoints(name, id); }

    if (change === '++') {
      points.points = points.points + 1;
    } else {
      points.points = points.points - 1;
    }

    const ret = [`${name} has ${points.points} points`];

    if (reason) {
      const reasonId = nameToId(reason);
      const existingReason = points.reasons[reasonId] || { score: 0, reason };

      if (change === '++') {
        existingReason.score++;
      } else {
        existingReason.score--;
      }

      points.reasons[reasonId] = existingReason;
      ret.push([`${existingReason.score} of which ${existingReason.score === 1 ? 'is' : 'are'} for ${reason}`]);
    }

    this.bot.db.set(`points.things.${id}`, points).value();
    this.bot.db.write();

    this.updateTops();


    return ret.join(', ');
  }

  @permissionGroup('points');
  @help('++ or -- alone will add (or remove) points from the most recently up/downvoted thing');
  @listen(REPEAT_REGEX);
  async repeat([, change, reason], message) {
    const lastVote = this.lastVote[message.channel];
    if (!lastVote) { return; }

    // re-run changepoints with the same name, the new change, and either a new
    // reason or the old one
    return await this.changePoints([
      undefined,
      lastVote.name,
      change,
      reason || lastVote.reason
    ], message);
  }

  @permissionGroup('points');
  @help('exobot++ or exobot-- adds or removes points from exobot');
  @respond(REPEAT_REGEX);
  async exobotPoints([, change, reason], message) {
    const lastVote = this.lastVote[message.channel];
    if (!lastVote) { return; }

    // re-run changepoints with the same name, the new change, and either a new
    // reason or the old one
    return await this.changePoints([
      undefined,
      this.bot.options.name,
      change,
      reason || lastVote.reason
    ], message);
  }

  @permissionGroup('points');
  @help('/top <n> to show top <n> users.');
  @respond(/^tops?\s*(\d*)?$/i);
  async tops ([, n=10]) {
    if (n > 25) { n = 25; }

    const scores = this.bot.db.get('points.things').value();
    const tops = this.bot.db.get('points.tops').slice(0,n).value();

    const text = [clark(tops.map(t => scores[t].points))];
    text.push(`Top ${Math.min(n, tops.length)}:`);

    tops.forEach(t => text.push(`${scores[t].name}: ${scores[t].points}`));

    return text.join('\n');
  }

  @permissionGroup('points');
  @help('/score <user> to show score for a user.');
  @respond(/^score(?: for)?(.*)$/i);
  async score ([, name]) {
    name = name.trim();
    const id = nameToId(name);

    const points = this.bot.db.get(`points.things.${id}`).value();
    const { reasons } = points;

    const text = [`${name} has ${points.points} points.`];
    const reasonKeys = Object.keys(points.reasons);

    if (reasonKeys.length > 0) {
      text.push('Here are some reasons:');

      reasonKeys.forEach(r => {
        text.push(`${reasons[r].reason}: ${reasons[r].score} points`);
      });
    }

    return text.join('\n');
  }

  async updateTops() {
    const tops = this.bot.db.get('points.things')
                             .orderBy('points', 'desc')
                             .map('id')
                             .value();

    this.bot.db.set('points.tops', tops).value();
    this.bot.db.write();
  }

  buildPoints (name, id) {
    return {
      name,
      id,
      points: 0,
      reasons: {},
    };
  }
}
