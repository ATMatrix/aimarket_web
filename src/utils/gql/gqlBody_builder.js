/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

/** type is GQLType , Reference GQLSever typeDefs
 *
 * @param  {String!}    GQL         must containing Attributes username,email,password
 * @param  {Object!}    variables   example {variable_name:variable_value...}
 * @return {Object}                 An object containing Attributes query,variables
 *
 */



export function gqlBody_builder(GQL,variables) {
  if(variables == undefined)throw ("gqlBody_builder variables undefined!");
  return {
    query: GQL,
    variables: variables
  }
}