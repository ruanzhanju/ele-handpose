import { Hand } from "@tensorflow-models/hand-pose-detection";
import { LayersModel } from "@tensorflow/tfjs";
import { IState } from "../control-system";
import { ControlSystem } from "../control-system.class";
import * as tf from '@tensorflow/tfjs'
import { modelUrl } from '../data'

export class KeyboardState implements IState {
  public system: ControlSystem;
  public model: LayersModel | null;
  private minMax?: {min: tf.Scalar[], max: tf.Scalar[]}

  constructor(system: ControlSystem) {
    this.system = system
    this.model = null
  }
  public disposeModel() {
    this.model?.dispose()
    this.minMax?.max.forEach(scaler => scaler.dispose())
    this.minMax?.min.forEach(scalar => scalar.dispose())
  }
  public async loadModel() {
    // if(this.model) this.disposeModel()
    // await tf.loadLayersModel(modelUrl.keyboard)
  }
  public async nextTick(hand?: Hand) {
    // throw new Error("Method not implemented.");
  }

}
