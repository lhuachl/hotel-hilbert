import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Cylinder, Box } from "@react-three/drei";

function WeightPlate({ position }) {
  return (
    <group position={position}>
      <Cylinder args={[0.6, 0.6, 0.15, 64]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.25} />
      </Cylinder>
      <Cylinder args={[0.2, 0.2, 0.18, 32]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} />
      </Cylinder>
    </group>
  );
}

function Rack() {
  const postHeight = 2.0;
  const hookHeight = 1.1;
  // X positions of the two uprights
  const xs = [-1.0, 1.0];
  return (
    <group>
      {/* Upright posts */}
      {xs.map((x) => (
        <RoundedBox
          key={`post-${x}`}
          args={[0.1, postHeight, 0.1]}
          radius={0.02}
          position={[x, postHeight / 2, 0]}
        >
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </RoundedBox>
      ))}

      {/* J-Hooks */}
      {xs.map((x) => (
        <Box
          key={`hook-${x}`}
          args={[0.1, 0.05, 0.5]}
          position={[x, hookHeight, 0.25]}
        >
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </Box>
      ))}
    </group>
  );
}

export default function Gym3D() {
  const barRef = useRef();
  // tiny oscillation to catch the eye
  useFrame(({ clock }) => {
    if (barRef.current) {
      barRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Bar and plates sit at hook height
  const barHeight = 1.1;
  return (
    <group>
      {/* Rack structure */}
      <Rack />

      {/* Bench */}
      <group position={[0, -0.5, 0]}>
        {/* Seat */}
        <Box args={[0.5, 0.1, 2.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#444" metalness={0.6} roughness={0.4} />
        </Box>
        {/* Backrest */}
        <Box
          args={[0.5, 0.1, 1.0]}
          position={[0, 0.45, -0.75]}
          rotation={[-0.4, 0, 0]}
        >
          <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
        </Box>
        {/* Bench legs */}
        {[
          [0.2, -0.55, 1.1],
          [-0.2, -0.55, 1.1],
          [0.2, -0.55, -1.1],
          [-0.2, -0.55, -1.1],
        ].map((pos, i) => (
          <Box key={i} args={[0.1, 1.0, 0.1]} position={pos}>
            <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
          </Box>
        ))}
      </group>

      {/* Barbell */}
      <group ref={barRef} position={[0, barHeight, 0]}>
        {/* Bar */}
        <RoundedBox args={[0.12, 0.12, 2]} radius={0.06} smoothness={5}>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Two plates each side */}
        {[1, 1.3].forEach((offset) => {
          /* eslint-disable react/jsx-key */
          <>
            <WeightPlate position={[offset, 0, 0]} />
            <WeightPlate position={[-offset, 0, 0]} />
          </>
          /* eslint-enable react/jsx-key */
        })}
      </group>
    </group>
  );
}