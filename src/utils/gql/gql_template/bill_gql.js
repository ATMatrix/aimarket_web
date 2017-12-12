'use strict';

/** type is GQLType , Reference GQLSever typeDefs
 *
 * @param  {params!}    String   containing All params ues JSON.stringify
 * @return {Object}              An object containing Attributes code,type,content
 *
 */

export const TRANSFER_GQL = `query  transferFunc($params: String!) {
                             transfer(params:$params) {
                                  code
                                  type
                                  content
                                }
                             }`;

export const CLOSECHANNEL_GQL = `query  closeFunc($params: String!) {
                                  closeChannel(params:$params) {
                                      code
                                      type
                                      content
                                    }
                                  }`;

export const GETPRICE_GQL = `query  getPriceFunc($params: String!) {
                                  getPrice(params:$params) {
                                      code
                                      type
                                      content
                                    }
                                  }`;
