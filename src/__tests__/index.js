import {expect} from 'chai';
import Enum from '../enum';

import {
  buildFields,
  buildParams,
  buildQuery,
  encodeField,
  encodeParam
} from '../';

describe('buildFields', function () {
  it('should return an array of encoded fields', function () {
    expect(buildFields({foo: {}})).to.deep.equal([ 'foo' ]);
  });
});

describe('buildParams', function () {
  it('should return an array of encoded parameters', function () {
    expect(buildParams({foo: 'bar'})).to.deep.equal([ 'foo:"bar"' ]);
  });
});

describe('buildQuery', function () {
  it('should return a grqphql query string', function () {
    expect(buildQuery({foo: {}})).to.deep.equal('{foo}');
  });
});

describe('encodeField', function () {
  it('should encode a field', function () {
    expect(encodeField('foo', {})).to.equal('foo');
  });

  it('should encode a field with parameters', function () {
    expect(encodeField('foo', {params: {bar: 'baz'}}))
      .to.equal('foo(bar:"baz")');
  });

  it('should encode a field with sub-fields', function () {
    expect(encodeField('foo', {fields: {f1: {}, f2: {}}}))
      .to.equal('foo{f1,f2}');
  });

  it('should encode a field with parameters and sub-fields', function () {
    expect(encodeField('foo', {fields: {f1: {}, f2: {}}, params: {bar: 'baz'}}))
      .to.equal('foo(bar:"baz"){f1,f2}');
  });
});

describe('encodeParam', function () {
  it('should encode a string parameter', function () {
    expect(encodeParam('foo', 'bar')).to.equal('foo:"bar"');
  });

  it('should encode a numeric parameter', function () {
    expect(encodeParam('foo', 12345)).to.equal('foo:12345');
  });

  it('should encode a enum parameter', function () {
    expect(encodeParam('foo', new Enum('BAR'))).to.equal('foo:BAR');
  });
});
