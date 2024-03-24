type TooltipProps = {
  text: string;
  id: string;
};

const Tooltip = ({ text, id }: TooltipProps) => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip text-caption';
  tooltip.id = id;
  tooltip.textContent = `* ${text}`;

  const create = () => tooltip;

  return {
    create
  };
};

export default Tooltip;
