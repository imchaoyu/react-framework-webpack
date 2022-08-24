import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3396634_mr03w23gsof.js',
});

const Icon = (props) => {
  const icon = `icon-${props.name}`;
  return <IconFont type={icon} />;
};

export default Icon;
