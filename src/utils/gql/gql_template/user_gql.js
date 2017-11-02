/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

/** type is GQLType , Reference GQLSever typeDefs
 *
 * @param  {User!}    user       must containing Attributes username,email,password
 * @return {Object}              An object containing Attributes code,type,content
 * 
 */

export const SINUP_GQL = `query  addUserFunc($user: User!) {
                             addUser(user:$user) {
                                  code
                                  type
                                  content
                                }
                             }`;


export const SININ_GQL = `query  loginUserFunc($user: User!) {
                            loginUser(user:$user) {
                                code
                                type
                                content
                              }
                            }`;

export const SETACCOUNT_GQL = `query  setAttAddressFunc($params: String!) {
                                 setAttAddress(params:$params) {
                                              code
                                              type
                                              content
                                            }
                                        }`;      
                                        
 export const GETACCOUNT_GQL = `query  getAttAddressFunc($params: String!) {
                                  getAttAddress(params:$params) {
                                                code
                                                type
                                                content
                                              }
                                          }`; 

