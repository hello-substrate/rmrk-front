import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import { selectSubstrate } from '@/reducers/substrate';
import { useAppSelector } from '@/store/hooks';

import utils from './utils';


const TxButton = function TxButton({
  accountPair = null,
  label,
  setStatus,
  type = 'QUERY',
  bType = 'default',
  attrs = null,
  disabled = false,
}: {
  accountPair: any,
  label,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  type: string,
  bType: any,
  attrs: any,
  disabled?: boolean
}) {
  const { api } = useAppSelector(selectSubstrate);
  const [unsub, setUnsub] = useState(null);
  const [sudoKey, setSudoKey] = useState(null);
  // 属性值
  const { palletRpc, callable, inputParams, paramFields } = attrs;
  const isQuery = () => type === 'QUERY';
  const isSudo = () => type === 'SUDO-TX';
  const isUncheckedSudo = () => type === 'UNCHECKED-SUDO-TX';
  const isUnsigned = () => type === 'UNSIGNED-TX';
  const isSigned = () => type === 'SIGNED-TX';
  const isRpc = () => type === 'RPC';
  const isConstant = () => type === 'CONSTANT';

  // 加载 sudo 的用户
  const loadSudoKey = () => {
    ; (async function () {
      if (!api || !api.query.sudo) {
        return;
      }
      const sudokey = await api.query.sudo.key();
      sudokey.isEmpty ? setSudoKey(null) : setSudoKey(sudokey.toString());
    })();
  };
  useEffect(loadSudoKey, [api]);

  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected },
    } = accountPair;
    let fromAcct;
    // signer is from Polkadot-js browser extension
    if (isInjected) {
    } else {
      fromAcct = accountPair;
    }
    return fromAcct;
  };

  const txResHandler = ({ status }) =>
    status.isFinalized
      ? setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      : setStatus(`Current transaction status: ${status.type}`);

  const txErrHandler = err =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`);

  const sudoTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx.sudo.sudo(api.tx[palletRpc][callable](...transformed))
      : api.tx.sudo.sudo(api.tx[palletRpc][callable]());

    const _unsub = txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => _unsub);
  };

  const uncheckedSudoTx = async () => {
    const fromAcct = await getFromAcct();
    const txExecute = api.tx.sudo.sudoUncheckedWeight(
      api.tx[palletRpc][callable](...inputParams),
      0
    );

    const _unsub = txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => _unsub);
  };

  const signedTx = async () => {
    const fromAcct = await getFromAcct();
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters

    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    const _unsub = await txExecute
      .signAndSend(fromAcct, txResHandler)
      .catch(txErrHandler);
    setUnsub(() => _unsub);
  };
  const unsignedTx = async () => {
    const transformed = transformParams(paramFields, inputParams);
    // transformed can be empty parameters
    const txExecute = transformed
      ? api.tx[palletRpc][callable](...transformed)
      : api.tx[palletRpc][callable]();

    const _unsub = await txExecute.send(txResHandler).catch(txErrHandler);
    setUnsub(() => _unsub);
  };

  const queryResHandler = result =>
    result.isNone ? setStatus('None') : setStatus(result.toString());

  const query = async () => {
    const transformed = transformParams(paramFields, inputParams);
    const _unsub = await api.query[palletRpc][callable](
      ...transformed,
      queryResHandler
    );
    setUnsub(() => _unsub);
  };

  const rpc = async () => {
    const transformed = transformParams(paramFields, inputParams, {
      emptyAsNull: false,
    });
    const _unsub = await api.rpc[palletRpc][callable](
      ...transformed,
      queryResHandler
    );
    setUnsub(() => _unsub);
  };

  const constant = () => {
    const result = api.consts[palletRpc][callable];
    result.isNone ? setStatus('None') : setStatus(result.toString());
  };

  const transaction = async () => {
    if (typeof unsub === 'function') {
      unsub();
      setUnsub(null);
    }

    setStatus('Sending...')
      ; (isSudo() && sudoTx()) ||
        (isUncheckedSudo() && uncheckedSudoTx()) ||
        (isSigned() && signedTx()) ||
        (isUnsigned() && unsignedTx()) ||
        (isQuery() && query()) ||
        (isRpc() && rpc()) ||
        (isConstant() && constant());
  };

  const transformParams = (
    paramFields,
    inputParams,
    opts = { emptyAsNull: true }
  ) => {
    // if `opts.emptyAsNull` is true, empty param value will be added to res as `null`.
    //   Otherwise, it will not be added
    const paramVal = inputParams.map(inputParam => {
      // To cater the js quirk that `null` is a type of `object`.
      if (
        typeof inputParam === 'object' &&
        inputParam !== null &&
        typeof inputParam.value === 'string'
      ) {
        return inputParam.value.trim();
      } else if (typeof inputParam === 'string') {
        return inputParam.trim();
      }
      return inputParam;
    });
    const params = paramFields.map((field, ind) => ({
      ...field,
      value: paramVal[ind] || null,
    }));

    return params.reduce((memo, { type = 'string', value }) => {
      if (value == null || value === '')
        return opts.emptyAsNull ? [...memo, null] : memo;

      let converted = value;

      // Deal with a vector
      if (type.indexOf('Vec<') >= 0) {
        converted = converted.split(',').map(e => e.trim());
        converted = converted.map(single =>
          isNumType(type)
            ? single.indexOf('.') >= 0
              ? Number.parseFloat(single)
              : Number.parseInt(single)
            : single
        );
        return [...memo, converted];
      }

      // Deal with a single value
      if (isNumType(type)) {
        converted =
          converted.indexOf('.') >= 0
            ? Number.parseFloat(converted)
            : Number.parseInt(converted);
      }
      return [...memo, converted];
    }, []);
  };
  const isNumType = type =>
    utils.paramConversion.num.some(el => type.indexOf(el) >= 0);

  const allParamsFilled = () => {
    if (paramFields.length === 0) {
      return true;
    }

    return paramFields.every((paramField, ind) => {
      const param = inputParams[ind];
      if (paramField.optional) {
        return true;
      }
      if (param == null) {
        return false;
      }

      const value = typeof param === 'object' ? param.value : param;
      return value !== null && value !== '';
    });
  };

  const isSudoer = acctPair => {
    if (!sudoKey || !acctPair) {
      return false;
    }
    return acctPair.address === sudoKey;
  };

  return (
    <Button
      type={bType}
      onClick={transaction}
      disabled={
        disabled ||
        !palletRpc ||
        !callable ||
        !allParamsFilled() ||
        ((isSudo() || isUncheckedSudo()) && !isSudoer(accountPair))
      }
    >
      {label}
    </Button>
  )
}

// prop type checking
TxButton.propTypes = {
  accountPair: PropTypes.object,
  setStatus: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'QUERY',
    'RPC',
    'SIGNED-TX',
    'UNSIGNED-TX',
    'SUDO-TX',
    'UNCHECKED-SUDO-TX',
    'CONSTANT',
  ]).isRequired,
  attrs: PropTypes.shape({
    palletRpc: PropTypes.string,
    callable: PropTypes.string,
    inputParams: PropTypes.array,
    paramFields: PropTypes.array,
  }).isRequired,
};


function TxGroupButton(props) {
  return (
    <View className=''>
      <Row>
        <Col span='8' >
          <Button className='at-col' label='Unsigned' type='UNSIGNED-TX' bType='primary' {...props} />
        </Col>
        <Col span='8' >
          <Button className='at-col' label='Signed' type='SIGNED-TX' bType='info' {...props} />
        </Col>
        <Col span='8' >
          <Button className='at-col' label='SUDO' type='SUDO-TX' bType='danger' {...props} />
        </Col>
      </Row>
    </View>
  );
}

export { TxButton, TxGroupButton }