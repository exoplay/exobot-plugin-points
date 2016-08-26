import { ChatPlugin, listen, respond, help, permissionGroup } from '@exoplay/exobot';

export const nameToId = (name) => {
  return name.replace(/[^\w]/g, '').toLowerCase();
}

export class Points extends ChatPlugin {
  register (bot) {
    super.register(bot);
    this.database('points', { things: {}, tops: [] });
  }

  @help('thing++ or thing-- to add or remove points. Optionally, "thing++ for <reason>"');
  @listen(/^([\s\w'@.\-:]*)\s*\+\+(?:\s+for (.*))?$/i);
  @listen(/^([\s\w'@.\-:]*)\s*\-\-(?:\s+for (.*))?$/i);
  async changePoints ([match, name, reason], val) {
    name = name.trim();
    const id = nameToId(name);

    await this.databaseInitialized();

    let points = this.bot.db.get(`points.things.${id}`).value();

    if (!points) { points = this.buildPoints(name, id); }

    points.points = points.points + val;

    if (reason) {
      const reasonId = nameToId(reason);
      const existingReason = points.reasons[reasonId] || { score: 0, reason: reason };
      existingReason.score++;

      points.reasons[reasonId] = existingReason;
    }

    this.bot.db.set(`points.things.${id}`, points).value();
    this.bot.db.write();

    this.updateTops();

    return `${name} has ${points.points} points.`;
  }

  @help('/top <n> to show top <n> users.');
  @respond(/^tops?\s*(\d*)?$/i);
  async tops ([match, n=10]) {
    await this.databaseInitialized();

    if (n > 25) { n = 25; }

    const scores = this.bot.db.get('points.things').value();
    const tops = this.bot.db.get('points.tops').slice(0,n).value();

    let text = [`Top ${Math.min(n, tops.length)}:`];

    tops.forEach(t => text.push(`${scores[t].name}: ${scores[t].points}`))

    return text.join('\n');
  }

  @help('/score <user> to show score for a user.');
  @respond(/^score(?: for)?(.*)$/i);
  async score ([match, name]) {
    name = name.trim();
    const id = nameToId(name);

    await this.databaseInitialized();

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
    await this.databaseInitialized();

    const tops = this.bot.db.get(`points.things`)
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
