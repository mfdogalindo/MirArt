'use client';

import { ConfigProvider, theme } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import React from 'react';

/**
 * Componente envoltorio para proveer el tema de AntD
 * @param param0
 * @returns
 */
export default function AntDProvider ({
  children
}: {
    children: React.ReactNode
  }) {
  return (
    <ConfigProvider
      locale={esES} theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#2813ad'
        },
        components: {
          Input: {
            colorBgContainer: '#020726'
          },
          Typography: {
            colorText: '#fff'
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}
