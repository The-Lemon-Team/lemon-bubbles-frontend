import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

export const LivingBackground = () => {
  const particlesInit = async (main: Engine) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 24, density: { enable: true, value_area: 800 } },
          color: { value: '#666666' },
          shape: {
            type: 'circle',
            stroke: { width: 0, color: '#000' },
            polygon: { nb_sides: 3 },
          },
          opacity: {
            value: 0.05,
            random: false,
          },
          size: {
            value: 51.29459670609772,
            random: false,
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          modes: {
            grab: { distance: 400, line_linked: { opacity: 0 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 0,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      }}
    />
  );
};
