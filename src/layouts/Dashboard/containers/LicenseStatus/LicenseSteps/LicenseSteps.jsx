import React from 'react';
import { Route } from 'react-router-dom';
import { message, Col } from 'antd';
import LicenseProgress from '../../../../../components/LicenseProgress';
import QUESTION_TYPE from '../../../../../utils/constants';
import Player from '../../../../../components/Player/Player';
import UploadFile from '../../../../../components/Upload/UploadFile';
import ScrolledTextArea from '../../../../../components/ScrolledTextArea';

const steps = [
  {
    id: 1,
    title: 'First license step',
    description: 'First license step description',
    type: QUESTION_TYPE.VIDEO,
    data: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      onStart: () => message.info('Video started'),
      onFinish: () => message.info('Video finished'),
    },
  },
  {
    id: 2,
    title: 'Second license step',
    description: 'Second license step description',
    type: QUESTION_TYPE.FILE_UPLOAD,
    data: {
      type: ['png', 'txt'],
      size: 250000,
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      progress: {
        strokeColor: {
          '0%': '#108ee9',
          '100%': '#87d068',
        },
        strokeWidth: 3,
        format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
      },
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} has incorrect data format or exceeded the allowed file size.`);
        }
      },
    },
  },
  {
    id: 3,
    title: 'Third license step',
    description: 'Third license step description',
    type: QUESTION_TYPE.AGREEMENT,
    data: {
      onFinish: () => message.success('Document has been read!'),
      children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        + 'Ad, cum dolorem ducimus impedit incidunt quasi quod totam? '
        + 'Aspernatur atque, autem consectetur dolore eos et exercitationem, '
        + 'expedita ipsum iste minima nisi odit omnis quidem sint tempore velit '
        + 'veritatis voluptatem voluptatibus! Alias autem doloribus explicabo impedit '
        + 'labore minima quae quidem, quo quos rem repellendus reprehenderit '
        + 'soluta voluptatibus. Aut et eveniet facilis laudantium repellendus.'
        + ' Adipisci aliquam cupiditate explicabo fugiat in iusto non, quos '
        + 'reiciendis, reprehenderit similique tenetur voluptate? Aspernatur '
        + 'assumenda consequatur cupiditate dicta, distinctio ducimus error'
        + ' explicabo ipsam iusto laudantium maxime nam nobis quam quasi quisquam'
        + ' reprehenderit repudiandae soluta tempora tenetur velit veniam veritatis '
        + 'voluptas voluptates! Asperiores, eum exercitationem explicabo ipsa iste libero '
        + 'magni molestias nam nesciunt porro qui, quisquam sint tenetur veniam'
        + ' veritatis. Dicta hic ipsa itaque magnam nihil non obcaecati officiis,'
        + ' porro sapiente soluta, veniam voluptates! Asperiores consectetur cum'
        + ' cumque dignissimos eaque eos error excepturi facilis harum incidunt '
        + 'itaque natus nesciunt nihil nisi non odio, officiis omnis, perspiciatis '
        + 'quae quod tempora tempore tenetur ut veritatis voluptas! Enim error'
        + ' esse iusto nesciunt sapiente? Dolor dolore facilis, fugiat, laborum molestias, '
        + 'nobis non optio perspiciatis porro quisquam quos vitae? Aut error'
        + ' ex facere mollitia nulla odio optio perferendis sint? Alias eos maxime'
        + ' praesentium totam!'
        + 'Ad, cum dolorem ducimus impedit incidunt quasi quod totam? '
        + 'Aspernatur atque, autem consectetur dolore eos et exercitationem, '
        + 'expedita ipsum iste minima nisi odit omnis quidem sint tempore velit '
        + 'veritatis voluptatem voluptatibus! Alias autem doloribus explicabo impedit '
        + 'labore minima quae quidem, quo quos rem repellendus reprehenderit '
        + 'soluta voluptatibus. Aut et eveniet facilis laudantium repellendus.'
        + ' Adipisci aliquam cupiditate explicabo fugiat in iusto non, quos '
        + 'reiciendis, reprehenderit similique tenetur voluptate? Aspernatur '
        + 'assumenda consequatur cupiditate dicta, distinctio ducimus error'
        + ' explicabo ipsam iusto laudantium maxime nam nobis quam quasi quisquam'
        + ' reprehenderit repudiandae soluta tempora tenetur velit veniam veritatis '
        + 'voluptas voluptates! Asperiores, eum exercitationem explicabo ipsa iste libero '
        + 'magni molestias nam nesciunt porro qui, quisquam sint tenetur veniam'
        + ' veritatis. Dicta hic ipsa itaque magnam nihil non obcaecati officiis,'
        + ' porro sapiente soluta, veniam voluptates! Asperiores consectetur cum'
        + ' cumque dignissimos eaque eos error excepturi facilis harum incidunt '
        + 'itaque natus nesciunt nihil nisi non odio, officiis omnis, perspiciatis '
        + 'quae quod tempora tempore tenetur ut veritatis voluptas! Enim error'
        + ' esse iusto nesciunt sapiente? Dolor dolore facilis, fugiat, laborum molestias, '
        + 'nobis non optio perspiciatis porro quisquam quos vitae? Aut error'
        + ' ex facere mollitia nulla odio optio perferendis sint? Alias eos maxime'
        + ' praesentium totam!',
      height: '100%',
    },
  },
];

const stepComponents = {
  [QUESTION_TYPE.VIDEO]: Player,
  [QUESTION_TYPE.FILE_UPLOAD]: UploadFile,
  [QUESTION_TYPE.AGREEMENT]: ScrolledTextArea,
};

const LicenseSteps = () => (
  <LicenseProgress steps={steps}>
    {steps.map((item) => {
      const Component = stepComponents[item.type];
      return (
        <Col align="center" style={{ background: 'white', height: '100vh' }}>
          <Route
            path={`/license/step/${item.id}`}
            render={() => (
              <Component {...item.data} />
            )}
          />
        </Col>
      );
    })}
  </LicenseProgress>
);

export default LicenseSteps;
