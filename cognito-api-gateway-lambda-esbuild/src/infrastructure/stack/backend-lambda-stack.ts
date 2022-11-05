import * as lambda from 'aws-cdk-lib/aws-lambda';

import * as base from '../../library/template/stack/base/base-stack';
import { AppContext } from '../../library/template/app-context';

import { TypeScriptCode } from "@mrgrain/cdk-esbuild";
import { Architecture } from 'aws-cdk-lib/aws-lambda';

export class BackendLambdaStack extends base.BaseStack {

    constructor(appContext: AppContext, stackConfig: any) {
        super(appContext, stackConfig);

        const bookFunc = this.createLambdaFunction(stackConfig.BookFunction);
        this.putParameter('BackendLambdaBookArn', bookFunc.functionArn);

        const userFunc = this.createLambdaFunction(stackConfig.UserFunction);
        this.putParameter('BackendLambdaUserArn', userFunc.functionArn);
    }

    private createLambdaFunction(baseName: string): lambda.Function {
        const lambdaPath = `./src/handlers/${baseName}`;
        const bundledCode = new TypeScriptCode(lambdaPath);
        const func = new lambda.Function(this, `${baseName}-func`, {
            functionName: `${this.projectPrefix}-${baseName}-func`,
            runtime: lambda.Runtime.NODEJS_16_X,
            code: bundledCode,
            handler: 'handle',
            architecture: Architecture.ARM_64
        });

        return func;
    }
}
