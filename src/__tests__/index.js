/* eslint-disable max-len */

import {expect} from 'chai';
import Enum from '../enum';

import {
  buildFields,
  buildParams,
  encodeField,
  encodeParam,
  default as graphqlify,
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

describe('encodeField', function () {
  it('should encode a field', function () {
    expect(encodeField('foo', {})).to.equal('foo');
  });

  it('should encode a field with a label', function () {
    expect(encodeField('foo', {field: 'bar'})).to.equal('foo:bar');
  });

  it('should encode a field with parameters', function () {
    expect(encodeField('foo', {params: {bar: 'baz'}}))
      .to.equal('foo(bar:"baz")');
  });

  it('should encode a field with sub-fields', function () {
    expect(encodeField('foo', {fields: {f1: {}, f2: {}}}))
      .to.equal('foo{f1,f2}');
  });

  it('should encode a field with label params and fields', function () {
    expect(encodeField('foo', {field: 'bar', fields: {f1: {}, f2: {}}, params: {baz: 'bat'}}))
      .to.equal('foo:bar(baz:"bat"){f1,f2}');
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

describe('graphqlify', function () {
  it('should return a grqphql query string', function () {
    expect(graphqlify({foo: {}})).to.deep.equal('{foo}');
  });
});
