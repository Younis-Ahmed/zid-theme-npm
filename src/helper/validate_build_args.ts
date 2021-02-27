import * as path from 'path'
import logger from '../console/logger'


const validate_build_args = (user_args: string[]) => {

    if (user_args[1]) {
        if (user_args[1] !== '--name' && user_args[1] !== '--path') {
            logger.error(`Invalid Argument ${user_args[1]}`)
        }
        else if (user_args[1] == '--name' && user_args[2] == '--path') {
            logger.error(`--name argument cannot be empty`)
        }
        else if (user_args[1] == '--path' && user_args[2] == '--name') {
            logger.error(`--path argument cannot be empty`)
        }
    }
    if (user_args[3]) {
        if (user_args[3] !== '--name' && user_args[3] !== '--path') {
            logger.error(`Invalid Argument ${user_args[3]}`)
        }
    }
    if (user_args[2] == '--name' || user_args[2] == '--path') {
        logger.error(`Invalid Argument ${user_args[2]} for ${user_args[1]}`)
    }
    if (user_args[4] == '--name' || user_args[4] == '--path') {
        logger.error(`Invalid Argument ${user_args[4]} for ${user_args[3]}`)
    }

    let build_path = process.cwd()
    let build_name = path.basename(process.cwd());

    for (let i = 1; i < user_args.length; i++) {
        if (user_args[i] == '--name' && user_args[i+1]) {
            build_name = user_args[i+1]
        }
        else if (user_args[i] == '--path' && user_args[i+1]) {
            build_path = path.resolve(process.cwd(), user_args[i+1] || '.')
        }
    }

    if (user_args.includes('--path') && !user_args.includes('--name')) {
        build_name = path.basename(build_path);
    }

    return { build_path: build_path, build_name: build_name }
}


export default validate_build_args