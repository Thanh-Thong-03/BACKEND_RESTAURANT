const amqp = require("amqplib");
const amqp_url_cloud = 'amqps://sxmaxhvj:GSGsafcbY8j3RwRDsVayPo3I96RmR6Er@armadillo.rmq.cloudamqp.com/sxmaxhvj'

const rabbitmq = {
  async sendMessage(queueName, data) {
    try {
      //1 tạo connect
      const connection = await amqp.connect(amqp_url_cloud);
      //2 tạo channel 
      const channel = await connection.createChannel();
      //3 tao hàng đợi
      await channel.assertQueue(queueName, { durable: false });
      //4 chuyển dữ liệu đối tượng thành chuỗi Json
      const jsonData = JSON.stringify(data);
      //5 Chuyển dữ liệu vào hàng đợi
      channel.sendToQueue(queueName, Buffer.from(jsonData));
      //6 Hiển thị thông báo
      console.log(" [x] Sent message '%s' to queue '%s'", jsonData, queueName);

      // Đóng kết nối sau khi gửi tin nhắn
    //   await connection.close();
    } catch (error) {
      console.error(error);
    }
  },

  // cách gọi hàm sendMessage
  // const sendMessage = require('./sendMessage');

  // const queueName = 'my_queue';
  // const message = 'This is a test message';

  // sendMessage(queueName, message);

  // receiveMessage.js

  async receiveMessage(queueName) {
    try {
        //1. Tạo kết nối
        const connection = await amqp.connect(amqp_url_cloud);
        //2. Tạo channel
        const channel = await connection.createChannel();
        //3. Khẳng định hàng đợi
        await channel.assertQueue(queueName, { durable: false });

        // Trả về một Promise mới
        return new Promise((resolve, reject) => {
            // Lắng nghe tin nhắn từ hàng đợi
            channel.consume(
                queueName,
                (msg) => {
                    console.log(" [x] Received message from queue '%s': %s", queueName, msg.content.toString());
                    // Giải quyết Promise với dữ liệu của tin nhắn
                    resolve(msg.content.toString());
                },
                { noAck: true }
            );
        });
    } catch (error) {
        console.error(error);
        throw error; // Ném lỗi để báo hiệu rằng đã xảy ra lỗi trong quá trình nhận dữ liệu từ hàng đợi
    }
}

  //cách gọi hàm receiveMessage
  // const receiveMessage = require('./receiveMessage');

  // async function main() {
  //     try {
  //         const queueName = 'order_queue';
  //         const message = await receiveMessage(queueName);
  //         console.log('Received message:', message);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // }
};

module.exports = rabbitmq;
