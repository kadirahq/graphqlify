import Enum from './enum';
export {default as Enum} from './enum';

export function buildFields(info) {
  return Object.keys(info)
    .filter(name => info.hasOwnProperty(name))
    .map(name => encodeField(name, info[name]));
}

export function buildParams(info) {
  return Object.keys(info)
    .filter(name => info.hasOwnProperty(name))
    .map(name => encodeParam(name, info[name]));
}

export function buildQuery(fields) {
  return `{${buildFields(fields).join(',')}}`;
}

export function encodeField(name, desc) {
  const parts = [ name ];

  if (desc.params) {
    parts.push(`(${buildParams(desc.params).join(',')})`);
  }

  if (desc.fields) {
    parts.push(`{${buildFields(desc.fields).join(',')}}`);
  }

  return parts.join('');
}

export function encodeParam(name, value) {
  let param = null;

  if (typeof value === 'string') {
    param = JSON.stringify(value);
  } else if (typeof value === 'number') {
    param = String(value);
  } else if (value instanceof Enum) {
    param = value.name;
  }

  return `${name}:${param}`;
}
