import {expect} from 'chai';
import Enum from '../enum';

describe('Enum', function () {
  it('should store the name', function () {
    const e = new Enum('foo');
    expect(e.name).to.equal('foo');
  });
});
