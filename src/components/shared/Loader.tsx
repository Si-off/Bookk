import styled from 'styled-components';

interface Props extends Pick<React.SVGAttributes<SVGRectElement>, 'fill'> {}

const COLOR = '#00B3A6';

const Loader = ({ fill = COLOR }: Props) => {
  return (
    <StyledSVG width='24' height='30' viewBox='0 0 24 30' xmlns='http://www.w3.org/2000/svg'>
      {[0, 8, 16].map((x, index) => (
        <rect key={index} x={x} y='10' width='4' height='10' fill={fill} opacity='0.2'>
          <animate
            attributeName='opacity'
            attributeType='XML'
            values='0.2; 1; .2'
            begin={`${0.15 * index}s`}
            dur='0.6s'
            repeatCount='indefinite'
          />
          <animate
            attributeName='height'
            attributeType='XML'
            values='10; 20; 10'
            begin={`${0.15 * index}s`}
            dur='0.6s'
            repeatCount='indefinite'
          />
          <animate
            attributeName='y'
            attributeType='XML'
            values='10; 5; 10'
            begin={`${0.15 * index}s`}
            dur='0.6s'
            repeatCount='indefinite'
          />
        </rect>
      ))}
    </StyledSVG>
  );
};

export default Loader;

const StyledSVG = styled.svg`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
