module.exports = class Call {
    constructor(callee, args) {
      Object.assign(this, { callee, args });
      
    }
    analyze(context) {
      this.callee.analyze(context);
      this.args.forEach(arg => arg.analyze(context));
      context.assertIsFunction(this.callee.referent);
      this.type = this.callee.referent.resultTypes;
     
      this.checkArgumentMatching(this.callee.referent);
    
      this.args.forEach((arg, index) => {
        if (arg.type === undefined) {
          throw new Error(`arg type:${this.callee.referent.paramTypes[index]}`)
        }
        arg.type.mustBeCompatibleWith(this.callee.referent.paramTypes[index]);
      })
      
    }
  
    checkArgumentMatching(callee) {
      let keywordArgumentSeen = false;
      const matchedParameterNames = new Set([]);
      this.args.forEach((arg, index) => {
        if (index >= callee.params.length) {
          throw new Error('Too many arguments in call');
        }
        if (arg.isKeywordArgument) {
          keywordArgumentSeen = true;
        } else if (keywordArgumentSeen) {
          throw new Error('Positional argument in call after keyword argument');
        }
        const parameterName = arg.id ? arg.id : callee.params[index].id;
        // if (!callee.allParameterNames.has(parameterName)) {
        //   throw new Error(`Function does not have a parameter called ${parameterName}`);
        // }
        // if (matchedParameterNames.has(parameterName)) {
        //   throw new Error(`Multiple arguments for parameter ${parameterName}`);
        // }
        matchedParameterNames.add(parameterName);
      });
  
      // Look for and report a required parameter that is not matched
      // const miss = [...callee.requiredParameterNames].find(name => !matchedParameterNames.has(name));
      // if (miss) {
      //   throw new Error(`Required parameter ${miss} is not matched in call`);
      // }
    }
    
};