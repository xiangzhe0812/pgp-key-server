import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GenericInterceptor } from "./utils/interceptors";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import tracer from "dd-trace";

async function bootstrap() {
    tracer.init();
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    );
    app.useGlobalInterceptors(new GenericInterceptor());

    const options = new DocumentBuilder()
        .setTitle("Nest Backend Service")
        .setDescription("Nest Backend Template")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup("swagger", app, document);

    await app.listen(3000);
}
bootstrap();
