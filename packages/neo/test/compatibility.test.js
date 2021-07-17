describe('No User Auth Compatibility', function () {
    this.timeout(10000)
    it('It should return a compatible provider', function () {
        var inititalTime = Date.now()
        console.log(inititalTime)
        return o3dapi.NEO.getProvider()
        .then(function(data){
            console.log(Date.now() - inititalTime)
            console.log(data);
            chai.expect(data).to.have.property('name');
            chai.expect(data).to.have.property('website');
            chai.expect(data).to.have.property('version');
            chai.expect(data).to.have.property('compatibility');
            chai.expect(data).to.have.property('extra');

            chai.expect(data.compatibility).to.be.an('array')
            chai.expect(data.extra).to.be.an('object')

            chai.expect(data.extra).to.have.property('theme')
            chai.expect(data.extra).to.have.property('currency')
        })
    });
  });

  describe('Get Networks', function () {
    this.timeout(10000)
    it('It should return a list of available networks and a default network', function () {
        return o3dapi.NEO.getNetworks()
        .then(function(data){
            console.log(data);
            chai.expect(data).to.have.property('networks');
            chai.expect(data).to.have.property('defaultNetwork');
            
            chai.expect(data.networks).to.be.an('array')
            chai.expect(data.networks).to.satisfy(function(list){
                return list.includes("MainNet") || list.includes("PrivateNet") || list.includes("TestNet")
            })
            chai.expect(data.defaultNetwork).to.be.oneOf(["MainNet", "PrivateNet", "TestNet"])
        
        })
    });
  });