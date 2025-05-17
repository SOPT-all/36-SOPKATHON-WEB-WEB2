import IC_Pin_default from '@/shared/assets/svg/ic_pin_default.svg';
import IC_Pin_click from '@/shared/assets/svg/ic_pin_click.svg';
import IC_Pin_x_default from '@/shared/assets/svg/ic_pin_x_default.svg';
import IC_Pin_x_click from '@/shared/assets/svg/ic_pin_x_click.svg';

interface PinProps {
  type: 'O' | 'X';
  active: boolean;
}

export default function Pin({ type, active }: PinProps) {
  let src = '';

  if (type === 'O') {
    src = active ? IC_Pin_click : IC_Pin_default;
  } else if (type === 'X') {
    src = active ? IC_Pin_x_click : IC_Pin_x_default;
  }

  return <img src={src} alt={`핀 아이콘 (${type})`} className="w-6 h-6" />;
}
