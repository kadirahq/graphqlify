import {_enum} from './enum';
export {default as Enum} from './enum';

export default function (fields) {
  return `{${_buildFields(fields).join(',')}}`;
}

export function _buildFields(info) {
  return Object.keys(info)
    .filter(name => info.hasOwnProperty(name))
    .map(name => _encodeField(name, info[name]));
}

export function _buildParams(info) {
  return Object.keys(info)
    .filter(name => info.hasOwnProperty(name))
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
  let param = null;

  if (typeof value === 'string') {
    param = JSON.stringify(value);
  } else if (typeof value === 'number') {
    param = String(value);
  } else if (value instanceof _enum) {
    param = value.name;
  }

  return `${name}:${param}`;
}
