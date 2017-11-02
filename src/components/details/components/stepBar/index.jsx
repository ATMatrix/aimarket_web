/**
 * Created by zhubg on 2017/10/31.
 */
import React from 'react';

import { Steps, Icon } from 'antd';

import icons from './icons';

const Step = Steps.Step;

const blockchainStepIcons = {
  wait: 'blockchainIconDark',
  process: 'blockchainIconBlue',
  finish: 'blockchainIconBlue',
  error: 'blockchainIconRed',
}

const workerStepIcons = {
  wait: 'workerIconDark',
  process: 'workerIconBlue',
  finish: 'workerIconBlue',
  error: 'workerIconRed',
}


function AISteps({ data }) {
  const statuses = Object.assign({
    blockchainStatus: 'wait',
    frozenFundsStatus: 'wait',
    workerStatus: 'wait',
    resultStatus: 'wait',
  }, data)

  return (
    <div style={{ background: 'white', padding: '20px' }}>
      <Steps>
        <Step
          status={statuses.blockchainStatus}
          title="Blockchain"
          icon={
            <img
              style={{ width: 25, height: 25 }}
              src={icons[blockchainStepIcons[statuses.blockchainStatus]]}
            />
          }
        />
        <Step
          status={statuses.frozenFundsStatus}
          title="FrozenFunds"
          icon={<Icon type="lock" />}
        />
        <Step
          status={statuses.workerStatus}
          title="Worker"
          icon={
            <img
              style={{ width: 25, height: 25 }}
              src={icons[workerStepIcons[statuses.workerStatus]]}
            />
          }
        />
        <Step
          status={statuses.deductFundsStatus}
          title="DeductFunds"
          icon={<Icon type="pay-circle-o" />}
        />
        <Step
          status={statuses.resultStatus}
          title="Done"
          icon={<Icon type="trophy" />}
        />
      </Steps>
    </div>
  );
}

export default AISteps;
