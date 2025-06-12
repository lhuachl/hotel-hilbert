/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ["!**/.server", "!**/.client"],

  // Base config
  extends: ["eslint:recommended"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
      },
      rules: {
        "react/prop-types": "off",
        // Ignorar props de React Three Fiber
        "react/no-unknown-property": [
          "error",
          {
            ignore: [
              // Props de Three.js/R3F comunes
              "position",
              "rotation",
              "scale",
              "args",
              "attach",
              "color",
              "intensity",
              "castShadow",
              "receiveShadow",
              "shadow-mapSize-width",
              "shadow-mapSize-height",
              "geometry",
              "material",
              "object",
              "dispose",
              "visible",
              "userData",
              "layers",
              "renderOrder",
              "frustumCulled",
              "matrixAutoUpdate",
              // Props específicas de materiales
              "metalness",
              "roughness",
              "transparent",
              "opacity",
              "alphaTest",
              "side",
              "wireframe",
              // Props de luces
              "penumbra",
              "angle",
              "decay",
              "distance",
              "target",
              // Props de controles y ambiente
              "enablePan",
              "enableZoom",
              "enableRotate",
              "autoRotate",
              "autoRotateSpeed",
              "minPolarAngle",
              "maxPolarAngle",
              "preset",
              // Props de sombras y efectos
              "rotation-x",
              "rotation-y",
              "rotation-z",
              "width",
              "height",
              "blur",
              "far",
              "near",
              // Agrega más según las uses
            ],
          },
        ],
      },
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};