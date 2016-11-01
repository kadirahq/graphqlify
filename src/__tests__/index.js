/* eslint-disable max-len */

import {expect} from 'chai';
import graphqlify, {Enum} from '../';

describe('graphqlify', function () {
  it('should encode a simple field', function () {
    const out = graphqlify({a: 1});
    expect(out).to.equal('{a}');
  });

  it('should encode multiple fields', function () {
    const out = graphqlify({a: 1, b: true, c: {}, d: null});
    expect(out).to.equal('{a,b,c}');
  });

  it('should encode field with a label', function () {
    const out = graphqlify({a: {field: 'b'}});
    expect(out).to.equal('{a:b}');
  });

  it('should encode a field with nested fields', function () {
    const out = graphqlify({a: {fields: {b: {fields: {c: 1}}}}});
    expect(out).to.equal('{a{b{c}}}');
  });

  it('should encode field with boolean parameter', function () {
    const out = graphqlify({a: {params: {b: false}}});
    expect(out).to.equal('{a(b:false)}');
  });

  it('should encode field with number parameter', function () {
    const out = graphqlify({a: {params: {b: 12.34}}});
    expect(out).to.equal('{a(b:12.34)}');
  });

  it('should encode field with string parameter', function () {
    const out = graphqlify({a: {params: {b: 'c'}}});
    expect(out).to.equal('{a(b:"c")}');
  });

  it('should encode field with enum parameter', function () {
    const out = graphqlify({a: {params: {b: Enum('c')}}});
    expect(out).to.equal('{a(b:c)}');
  });

  it('should encode field with object parameter', function () {
    const out = graphqlify({a: {params: {b: {c: 'd'}}}});
    expect(out).to.equal('{a(b:{c:"d"})}');
  });

  it('should encode field with array parameter', function () {
    const out = graphqlify({a: {params: {b: [ 'c', 'd' ]}}});
    expect(out).to.equal('{a(b:["c","d"])}');
  });

  it('should encode a field with params and nested fields', function () {
    const out = graphqlify({a: {params: {b: 'c'}, fields: {d: 1}}});
    expect(out).to.equal('{a(b:"c"){d}}');
  });
});

describe('query', function () {
  it('should encode a graphql query', function () {
    const out = graphqlify.query({a: 1});
    expect(out).to.equal('query{a}');
  });

  it('should encode a named graphql query', function () {
    const out = graphqlify.query('q1', {a: 1});
    expect(out).to.equal('query q1{a}');
  });
});

describe('mutation', function () {
  it('should encode a graphql mutation', function () {
    const out = graphqlify.mutation({a: 1});
    expect(out).to.equal('mutation{a}');
  });

  it('should encode a named graphql mutation', function () {
    const out = graphqlify.mutation('m1', {a: 1});
    expect(out).to.equal('mutation m1{a}');
  });
});
