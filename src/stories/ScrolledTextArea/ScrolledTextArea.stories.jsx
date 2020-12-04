import React from 'react';
import { message } from 'antd';
import ScrolledTextArea from '../../components/ScrolledTextArea';

export default {
  title: 'Scrolled Text Area',
  component: ScrolledTextArea,
  argTypes: {
    height: {
      control: {
        type: 'range',
        min: 100,
        max: 1000,
        step: 10,
      },
    },
  },
};

const largeText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, cum dolorem ducimus impedit incidunt quasi quod totam? Aspernatur atque, autem consectetur dolore eos et exercitationem, expedita ipsum iste minima nisi odit omnis quidem sint tempore velit veritatis voluptatem voluptatibus! Alias autem doloribus explicabo impedit labore minima quae quidem, quo quos rem repellendus reprehenderit soluta voluptatibus. Aut et eveniet facilis laudantium repellendus. Adipisci aliquam cupiditate explicabo fugiat in iusto non, quos reiciendis, reprehenderit similique tenetur voluptate? Aspernatur assumenda consequatur cupiditate dicta, distinctio ducimus error explicabo ipsam iusto laudantium maxime nam nobis quam quasi quisquam reprehenderit repudiandae soluta tempora tenetur velit veniam veritatis voluptas voluptates! Asperiores, eum exercitationem explicabo ipsa iste libero magni molestias nam nesciunt porro qui, quisquam sint tenetur veniam veritatis. Dicta hic ipsa itaque magnam nihil non obcaecati officiis, porro sapiente soluta, veniam voluptates! Asperiores consectetur cum cumque dignissimos eaque eos error excepturi facilis harum incidunt itaque natus nesciunt nihil nisi non odio, officiis omnis, perspiciatis quae quod tempora tempore tenetur ut veritatis voluptas! Enim error esse iusto nesciunt sapiente? Dolor dolore facilis, fugiat, laborum molestias, nobis non optio perspiciatis porro quisquam quos vitae? Aut error ex facere mollitia nulla odio optio perferendis sint? Alias eos maxime praesentium totam!';

const ScrolledTextAreaStory = ({
  height, children, onFinish, ...rest
}) => (
  <ScrolledTextArea
    height={height}
    onFinish={onFinish}
    {...rest}
  >
    {children}
  </ScrolledTextArea>
);

export const Default = ScrolledTextAreaStory.bind({});

Default.args = {
  onFinish: () => {
    message.success('Document has been read!');
  },
  height: 200,
  children: largeText,
};
