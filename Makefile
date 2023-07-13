PHONY: generate
generate:
		IF NOT EXIST src\\cryptodata_v1 mkdir src\\cryptodata_v1
		protoc --proto_path=./src/proto \
    --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
    --js_out=import_style=commonjs,binary:./src/cryptodata_v1 \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/cryptodata_v1 \
    ./src/proto/cryptodata.proto
