
'use strict';

/** type is GQLType , Reference GQLSever typeDefs
 *
 * @param  {params!}    String   containing All params ues JSON.stringify
 * @return {Object}              An object containing Attributes code,type,content
 *
 */

export const GETCHANNEL_GQL = `query  getChannelFunc($params: String!) {
                                        getChannel(params: $params) {
                                                    code
                                                    type
                                                    content
                                                  }
                                              }`;

export const OPENCHANNEL_GQL = `query  openChannelFunc($params: String!) {
                                        openChannel(params: $params) {
                                                    code
                                                    type
                                                    content
                                                  }
                                              }`;

export const TOPUPCHANNEL_GQL = `query  topUpChannelFunc($params: String!) {
                                          topUpChannel(params: $params) {
                                                    code
                                                    type
                                                    content
                                                  }
                                              }`;

export const CLOSECHANNEL_GQL = `query  closeChannelFunc($params: String!) {
                                          closeChannel(params: $params) {
                                                    code
                                                    type
                                                    content
                                                  }
                                              }`;     
                                            
export const GETPRICE_GQL = `query  getPriceFunc($params: String!) {
                                          getPrice(params: $params) {
                                                    code
                                                    type
                                                    content
                                                  }
                                              }`;                                                 
export const DEDUCT_GQL = `query  deductFunc($params: String!) {
                                        deduct(params:$params) {
                                              code
                                              type
                                              content
                                            }
                                        }`;

export const SETCHANNEL_GQL = `query  setChannelFunc($params: String!) {
                                        setChannel(params:$params) {
                                              code
                                              type
                                              content
                                            }
                                        }`;                                       