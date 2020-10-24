import React from 'react';

interface IProps {
  width: number;
  height: number;
  laoding: boolean;
  borderColor: string;
  borderTopColor: string;
}

export default function Spinner(props: IProps) {
  const { width, height, laoding, borderColor, borderTopColor } = props;
  return (
    <div style={{ width, height, borderColor, borderTopColor }}>
      <div
        style={laoding ? { display: 'block' } : { display: 'none' }}
        className="spinner"
      />
    </div>
  );
}
