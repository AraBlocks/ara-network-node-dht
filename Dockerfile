FROM arablocks/ann
WORKDIR /opt/dht/
ADD . /opt/dht/
ENTRYPOINT [ "ann",  "-t", "." ]
