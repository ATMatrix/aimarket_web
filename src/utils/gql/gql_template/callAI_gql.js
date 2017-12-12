/**
 * Created by zhubg on 2017/10/20.
 */
/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

/** type is GQLType , Reference GQLSever typeDefs
 *
 * @param  {params!}    String   containing All params ues JSON.stringify
 * @return {Object}              An object containing Attributes code,type,content
 *
 */

export const CALLAI_GQL = `query  callAIFunc($params: String!) {
                             callAI(params:$params) {
                                  code
                                  type
                                  content
                                }
                             }`;


export const GETAILIST_GQL = `query  getAiListFunc($params: String) {
                                getAiList(params:$params) {
                                              code
                                              type
                                              content
                                            }
                                        }`;


export const GETAIDETAILS_GQL = `query  getAiDetailsFunc($id: Int!) {
                                getAiDetails(id:$id) {
                                              code
                                              type
                                              content
                                            }
                                        }`;

