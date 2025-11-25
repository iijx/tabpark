
import useApp from '@/compositions/use-app';

interface IOpt {
	pinClickHook: () => void;
}
export const usePin = (opt: IOpt) => {

	const { appState, appAction } = useApp();

	// pin click 事件
	const handlePinClick = (pinId: string) => {

		opt.pinClickHook && opt.pinClickHook();
		
		// 如果点击的是当前的 pin，不做任何操作
		if (appState.curPinId.value === pinId) return;
		else {
			appAction.setCurPinId(pinId);
		}
	}


	return {
		handlePinClick,
	};
}