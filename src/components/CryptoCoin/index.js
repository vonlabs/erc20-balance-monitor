import styled from '@emotion/styled';

export const CryptoIcon = styled.div`
  width: 30px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: contain;
  &.ETH {
    background-image: url('./ethereum.svg');
  }
  &.LINK {
    background-image: url('./chainlinktoken_32.webp');
  }
  &.USDT {
    background-image: url('./tether_32.webp');
  }
  &.DAI {
    background-image: url('./MCDDai_32.webp');
  }
`