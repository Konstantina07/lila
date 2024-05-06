// import * as util from '../util';
import * as stages from '../stage/list';
import * as scoring from '../score';
import { Prop, prop } from 'common';
import { LearnProgress, SnabbdomLearnOpts } from '../learn';
import { Stage } from '../stage/list';
import { LearnCtrl } from './ctrl';

export class SnabbdomSideCtrl {
  opts: SnabbdomLearnOpts;
  trans: Trans;
  data: LearnProgress;

  categId: Prop<number> = prop(0);

  constructor(ctrl: LearnCtrl, opts: SnabbdomLearnOpts) {
    this.opts = opts;
    this.trans = ctrl.trans;
    this.data = ctrl.data;

    // TODO:
    // m.redraw.strategy('diff');
  }

  reset = () => this.opts.storage.reset();
  active = () => this.opts.stageId;
  inStage = () => this.opts.route === 'run';
  setStage = (stage: Stage) => {
    this.categId(stages.stageIdToCategId(stage.id) || this.categId());
  };
  progress = () => {
    const max = stages.list.length * 10;
    const data = this.data.stages;
    const total = Object.keys(data).reduce(function (t, key) {
      const rank = scoring.getStageRank(stages.byKey[key], data[key].scores);
      if (rank === 1) return t + 10;
      if (rank === 2) return t + 8;
      return t + 5;
    }, 0);
    return Math.round((total / max) * 100);
  };
}
