# graphqlify-null

Fork of `graphqlify` that allows sending null values. Because who knows if [#8](https://github.com/kadirahq/graphqlify/pull/8) will ever be merged.

# graphqlify

This module helps you build GraphQL queries using plain JavaScript objects. This can be useful when you need to programmatically build GraphQL queries. Install the module from npm to get started.

```
npm i -S graphqlify
```

## Example

**GraphQL**

```
{
  teamFourStar {
    members {
      memberName
    }
    saiyans: members(type: SAIYAJIN, minPower: 9000) {
      memberName
      powerLevel
    }
  }
}
```

**JavaScript**

```js
import graphqlify, {Enum} from 'graphqlify';

const string = graphqlify({
  teamFourStar: {
    fields: {
      members: {
        fields: {memberName: {}}
      },
      saiyans: {
        field: 'members',
        params: {type: Enum('SAIYAJIN'), minPower: 9000},
        fields: {memberName: {}, powerLevel: {}}
      }
    }
  }
});
```
