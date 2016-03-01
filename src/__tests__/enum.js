import {expect} from 'chai';
import {default as Enum, _enum} from '../enum';

describe('Enum', function () {
  it('should store the name', function () {
    const e = Enum('foo');
    expect(e).to.be.an.instanceof(_enum);
    expect(e.name).to.equal('foo');
  });
});
