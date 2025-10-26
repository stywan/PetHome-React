// Karma configuration
module.exports = function(config) {
  config.set({
    // Base path que se usará para resolver todos los patrones (archivos y excluidos)
    basePath: '',

    // Frameworks de testing a usar
    // Frameworks disponibles: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'webpack'],

    // Lista de archivos / patrones para cargar en el navegador
    files: [
      'src/**/*.spec.js',
      'src/**/*.spec.jsx'
    ],

    // Lista de archivos / patrones a excluir
    exclude: [],

    // Preprocesar archivos coincidentes antes de servirlos al navegador
    // Preprocesadores disponibles: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack']
    },

    // Configuración de Webpack
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                plugins: [
                  ['babel-plugin-istanbul', {
                    exclude: ['**/*.spec.js', '**/*.spec.jsx', '**/node_modules/**']
                  }]
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // Middleware de webpack
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Reporteros de resultados de tests
    // Reporteros posibles: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['spec', 'kjhtml', 'coverage'],

    // Puerto del servidor web
    port: 9876,

    // Habilitar / deshabilitar colores en la salida (reporteros y logs)
    colors: true,

    // Nivel de logging
    // Valores posibles: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Habilitar / deshabilitar observación de archivos y ejecución de tests cuando cambien
    autoWatch: true,

    // Navegadores para lanzar y capturar
    // Navegadores disponibles: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],

    // Configuración del lanzador de Chrome
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },

    // Continuous Integration mode
    // Si es true, Karma captura navegadores, ejecuta los tests y sale
    singleRun: false,

    // Nivel de concurrencia
    // Cuántos navegadores deben iniciarse simultáneamente
    concurrency: Infinity,

    // Configuración de timeouts
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,

    // Client configuration
    client: {
      clearContext: false, // deja visible la salida de Jasmine Spec Runner en el navegador
      jasmine: {
        random: false // deshabilita aleatorización de tests
      }
    },

    // Configuración de cobertura de código
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
        { type: 'json', subdir: '.', file: 'coverage.json' }
      ],
      check: {
        global: {
          statements: 85,
          branches: 70,
          functions: 85,
          lines: 85
        }
      }
    }
  });
};
