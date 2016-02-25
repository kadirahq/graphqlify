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
  let string = name;
  let params = Array.isArray(desc) ? desc[0] : desc.params;
  let fields = Array.isArray(desc) ? desc[1] : desc.fields;

  if (params) {
    string += `(${buildParams(params).join(',')})`;
  }

  if (fields) {
    string += `{${buildFields(fields).join(',')}}`;
  }

  return string;
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
