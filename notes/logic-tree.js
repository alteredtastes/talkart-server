commands = {
  validFirst1: {
    validFirst1.validSecond1: {
      validFirst1.validSecond1.validThird1 {
        'validFirst1': function(p){
          //given this key word order, this method is called.
        }
      }
    },
    validFirst1.validSecond2: {
      validFirst1.validSecond2.validThird1 {
        'validFirst1': function(p){
          //given this key word order, this method is called.
        }
      }
    },
    validFirst1.validSecond3: {
      validFirst1.validSecond3.validThird1: {
        validFirst1.validSecond3.validThird1.validFourth1: {
          'validFirst1': function(p) {
            //given this key word order, this method is called.
          }
        },
        validFirst1.validSecond3.validThird1.validFourth2: {
          'validFirst1': function(p) {
            //given this key word order, this method is called.
          }
        },
        validFirst1.validSecond3.validThird1.validFourth3: {
          'validFirst1': function(p) {
            //given this key word order, this method is called.
          }
        },
      }
    },
    validFirst1.validSecond4: {
      'validFirst1': function(p) {
        //given this key word order, this method is called.
      }
    }
  },
  validFirst2: {
    validFirst2.validSecond1: {
      'validFirst2': function(p) {
        //given this key word order, this method is called.
      }
    },
    validFirst2.validSecond2: {
      validFirst2.validSecond2.validThird1: {
        'validFirst2': function(p) {
          //given this key word order, this method is called.
        }
      }
    },
    validFirst2.validSecond3: {
      validFirst2.validSecond3.validThird2: {
        validFirst2.validSecond3.validThird2.validFourth1: {
          'validFirst2': function(p) {
            //given this key word order, this method is called.
          }
        },
        validFirst2.validSecond3.validThird2.validFourth2: {
          'validFirst2': function(p) {
            //given this key word order, this method is called.
          }
        },
      }
    },
    validFirst2.validSecond4: {
      'validFirst2': function(p) {
        //given this key word order, this method is called.
      }
    }
  },
  validFirst3: {
    validFirst3.validSecond1: {

    },
    validFirst3.validSecond2: {

    },
    validFirst3.validSecond3: {

    },
    validFirst3.validSecond4: {

    }
  },
  validFirst4: {
    validFirst4.validSecond1: {

    }
  }
}
