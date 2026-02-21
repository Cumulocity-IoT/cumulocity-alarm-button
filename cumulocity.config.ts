import type { ConfigurationOptions } from '@c8y/devkit';
import { author, description, version, name, license } from './package.json';

export default {
  runTime: {
    author,
    description,
    version,
    name,
    license,
    key: 'c8y-pkg-alarm-widget-key',
    contextPath: 'c8y-pkg-alrm-button-widget',
    contentSecurityPolicy:
      "base-uri 'none'; default-src 'self' 'unsafe-inline' http: https: ws: wss:; connect-src 'self' http: https: ws: wss:;  script-src 'self' *.bugherd.com *.twitter.com *.twimg.com *.aptrinsic.com 'unsafe-inline' 'unsafe-eval' data:; style-src * 'unsafe-inline' blob:; img-src * data: blob:; font-src * data:; frame-src *; worker-src 'self' blob:;",
    dynamicOptionsUrl: true,
    remotes: {
      'cumulocity-alarm-button': ['AlarmButtonModule'],
    },
    package: 'plugin',
    isPackage: true,
    noAppSwitcher: true,
    exports: [
      {
        name: 'Raise alarm plugin',
        module: 'AlarmButtonModule',
        path: './src/widget/alarm-button.module.ts',
        description: 'Widget to raise alarm',
      },
    ],
  },
  buildTime: {
    copy: [
      {
        from: 'src/assets/raise-alarm-config.png',
        to: 'images/raise-alarm-config.png',
      },
    ],
    federation: [
      '@angular/animations',
      '@angular/cdk',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angular/upgrade',
      '@c8y/client',
      '@c8y/ngx-components',
      'ngx-bootstrap',
      '@ngx-translate/core',
    ],
  },
} as const satisfies ConfigurationOptions;
