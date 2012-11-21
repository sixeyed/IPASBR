
exports.namespace = function namespace(){
	return '[your Service Bus namespace]';
};

exports.issuerName = function issuerName() {
	return 'partialTrustConsumer';
}

exports.issuerSecret = function issuerSecret() {
	return '[partialTrustConsumer password]';
}

