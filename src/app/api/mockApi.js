import { delay } from '../framework/util/Util';
import { sampleData } from './sampleData';

export function fetchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(sampleData);
  })
}