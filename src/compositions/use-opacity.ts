// import { throttle } from 'throttle-debounce';

export default {};
// const mainStyle = reactive({
//     opacity: 1,
// })
// const inputContainer = ref<HTMLElement | null>(null);
// let viewport = { 
//     documentWidth: 0,
//     documentHeight: 0,
//     inputLeftCenter: {x: 0, y: 0},
//     inputRightCenter: {x: 0, y: 0},
//     inputAbsCenter: {x: 0, y: 0},
//     maxDistance: 0,
// }
// const updateViewport = () => {
//     const inputPos = (inputContainer.value as HTMLElement).getBoundingClientRect();
//     viewport.documentWidth = document.documentElement.clientWidth;
//     viewport.documentHeight = document.documentElement.clientHeight;
//     viewport.inputLeftCenter = {
//         x: inputPos.left,
//         y: inputPos.top + inputPos.height / 2,
//     }
//     viewport.inputRightCenter = {
//         x: inputPos.left + inputPos.width,
//         y: inputPos.top + inputPos.height / 2,
//     }
//     viewport.inputAbsCenter = {
//         x: inputPos.left + inputPos.width / 2,
//         y: inputPos.top + inputPos.height / 2,
//     }
//     viewport.maxDistance = Math.sqrt(Math.pow(viewport.documentHeight - inputPos.top - inputPos.height, 2) + Math.pow(inputPos.left, 2));
// }
// onMounted(() => {
//     updateViewport();
//     window.addEventListener('resize', updateViewport);
// })
// const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
//     return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
// }
// const handleMouseMove = throttle(1000 / 60, (e: MouseEvent) => {
//     const { clientX, clientY } = e;
//     const inputPos = (inputContainer.value as HTMLElement).getBoundingClientRect();
//     let distance = 0;
//     if (clientX >= inputPos.left && clientX <= inputPos.left + inputPos.width) {
//         if (clientY >= inputPos.top && clientY <= inputPos.top + inputPos.height) distance = 1;
//         else distance = Math.abs(clientY - viewport.inputAbsCenter.y);
//     } else if (clientX < inputPos.left) distance = getDistance(clientX, clientY, viewport.inputLeftCenter.x, viewport.inputLeftCenter.y);
//     else distance = getDistance(clientX, clientY, viewport.inputRightCenter.x, viewport.inputRightCenter.y);

//     mainStyle.opacity = 1 - distance / viewport.maxDistance;
// })
