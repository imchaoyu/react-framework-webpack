import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3396634_54pkdxup915.js',
});

const Icon = (props) => {
  const icon = `icon-${props.name}`;
  return (
    <IconFont
      type={icon}
      style={{ fontSize: props.fontSize ?? '16px', color: props.color ?? '#fff' }}
    />
  );
};

export default Icon;
