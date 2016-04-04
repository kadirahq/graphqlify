import {_enum} from './enum';
export {default as Enum} from './enum';

export default function (fields) {
  return `{${_buildFields(fields).join(',')}}`;
}

export function _buildFields(info) {
  return Object.keys(info)
    .filter(info.hasOwnProperty.bind(info))
    .map(name => _encodeField(name, info[name]));
}

export function _buildParams(info) {
  return Object.keys(info)
    .filter(info.hasOwnProperty.bind(info))
    .map(name => _encodeParam(name, info[name]));
}

export function _encodeField(label, desc) {
  const parts = [ ];

  if (desc.field) {
    parts.push(`${label}:${desc.field}`);
  } else {
    parts.push(label);
  }

  if (desc.params) {
    parts.push(`(${_buildParams(desc.params).join(',')})`);
  }

  if (desc.fields) {
    parts.push(`{${_buildFields(desc.fields).join(',')}}`);
  }

  return parts.join('');
}

export function _encodeParam(name, value) {
  if (value === null) {
    return '';
  }

  const param = _encodeParamValue(value);
  return `${name}:${param}`;
}

export function _encodeParamValue(value) {
  if (Array.isArray(value)) {
    const elements = value.map(_encodeParamValue);
    return `[${elements.join(',')}]`;
  }

  if (value instanceof _enum) {
    return value.name;
  }

  if (typeof value === 'object') {
    const fields = Object.keys(value)
      .filter(value.hasOwnProperty.bind(value))
      .map(name => _encodeParam(name, value[name]));
    return `{${fields.join(',')}}`;
  }

  if (typeof value === 'string') {
    return JSON.stringify(value);
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'boolean') {
    return value;
  }

  throw new Error(`unknown param type ${typeof value} with value ${value}`);
}
