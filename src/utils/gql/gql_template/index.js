/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

import {
  SINUP_GQL,
  SININ_GQL,
  SETACCOUNT_GQL,
  GETACCOUNT_GQL
} from './user_gql';
import {TRANSFER_GQL, CLOSECHANNEL_GQL, GETPRICE_GQL, OPENCHANNEL_GQL, TOPUPCHANNEL_GQL, SETTLECHANNEL_GQL, GETCHANNELS_GQL} from './bill_gql';
import {CALLAI_GQL, GETAILIST_GQL, GETAIDETAILS_GQL} from './callAI_gql';

module.exports = {
  SINUP_GQL:SINUP_GQL,
  CALLAI_GQL:CALLAI_GQL,
  SININ_GQL:SININ_GQL,
  SETACCOUNT_GQL:SETACCOUNT_GQL,
  GETACCOUNT_GQL:GETACCOUNT_GQL,
  GETAILIST_GQL:GETAILIST_GQL,
  GETAIDETAILS_GQL:GETAIDETAILS_GQL,
  TRANSFER_GQL:TRANSFER_GQL,
  CLOSECHANNEL_GQL:CLOSECHANNEL_GQL,
  GETPRICE_GQL:GETPRICE_GQL,
  OPENCHANNEL_GQL:OPENCHANNEL_GQL,
  TOPUPCHANNEL_GQL:TOPUPCHANNEL_GQL,
  SETTLECHANNEL_GQL:SETTLECHANNEL_GQL,
  GETCHANNELS_GQL:GETCHANNELS_GQL,
  GETPRICE_GQL:GETPRICE_GQL
};
