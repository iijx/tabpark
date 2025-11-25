import imgOpt1 from '../assets/background/1.jpg';
import imgOpt2 from '../assets/background/2.jpg';
import imgOpt3 from '../assets/background/3.jpg';
import imgOpt4 from '../assets/background/4.jpg';
import imgOpt5 from '../assets/background/5.jpg';
import imgOpt6 from '../assets/background/6.jpg';
import imgOpt7 from '../assets/background/7.jpg';
import imgOpt8 from '../assets/background/8.jpg';
import imgOpt9 from '../assets/background/9.jpg';
// const imgOpt1 = '../assets/background/1.jpg';
// const imgOpt2 = '../assets/background/2.jpg';
// const imgOpt3 = '../assets/background/3.jpg';
// const imgOpt4 = '../assets/background/4.jpg';
// const imgOpt5 = '../assets/background/5.jpg';
// const imgOpt6 = '../assets/background/6.jpg';
// const imgOpt7 = '../assets/background/7.jpg';
// const imgOpt8 = '../assets/background/8.jpg';
// const imgOpt9 = '../assets/background/9.jpg';

export const useBackground = (() => {
  const selectedIndex = ref(4);
  const style = computed(() => {
    return {
      backgroundImage: `url('${imgs[selectedIndex.value]}')`
    }
  });
  
  const imgs = [
    imgOpt1,
    imgOpt2,
    imgOpt3,
    imgOpt4,
    imgOpt5,
    imgOpt6,
    imgOpt7,
    imgOpt8,
    imgOpt9
  ];
  return () => ({ style, imgs, selectedIndex });
})();