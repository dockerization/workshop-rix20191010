require 'bundler'
Bundler.require

set :port, ENV['PORT'] || 4568
set :bind, '0.0.0.0'
logic_port = ENV['LOGIC_PORT'] || 4567

products = JSON.parse(File.read('./storage/products.json'))

post '/initial_fill' do
  content_type :json

  # get JSON from body
  data = JSON.parse(request.body.read.to_s)
  slots = data['slots']
  capacity = data['capacity']
  product_list = []

  # create list of products
  for i in 0..slots-1
    index = i % products.length

    product_list.push({
      id: index,
      name: products[index]['name'],
      price: products[index]['price'],
      slot: i,
      count: capacity
    })
  end

  # render it
  {products: product_list}.to_json

end

post '/empty' do
  # doing heavy filting here
  sleep(5)

  content_type :json
  clnt = HTTPClient.new

  # get JSON from body
  data = JSON.parse(request.body.read.to_s)

  url = "http://#{request.ip}:#{logic_port}/slot_refill"
  index = data['product_id']

  {
    product: {
      id: index,
      name: products[index]['name'],
      price: products[index]['price'],
      slot: data['slot'],
      count: data['capacity']
    }
  }.to_json

end
