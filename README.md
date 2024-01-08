# 원모의 네스트제이에스 연습

> 갤로핑을 위한 작업의 일환  
> [읽은 것](https://docs.nestjs.com/)

## 네스트제이에스 메모

- 완전히 객체지향

```
[ Controller ]
In order to create a basic controller, we use classes and decorators

컨벤션? 규칙?
directory 명 -> route prefix -> @Controller('directory명')
directory 안에 controller, service, entity, DTO 등등 관련 있는 것끼리 모아놓기
DTO 개념을 적극 사용 -> class를 사용하기를 권장(js로 트랜스파일링 될 때 살아남을 수 있으므로...)

Controllers always belong to a module
```
```typescript
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
```
---
```
[ Provider ]
The main idea of a provider is that it can be injected as a dependency.
Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on.
classes strongly recommended following SOLID principles

< solid >
The Single-responsibility principle: "There should never be more than one reason for a class to change." In other words, every class should have only one responsibility.

The Open–closed principle: "Software entities ... should be open for extension, but closed for modification."

The Liskov substitution principle: "Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it."See also design by contract.

The Interface segregation principle: "Clients should not be forced to depend upon interfaces that they do not use."

The Dependency inversion principle: "Depend upon abstractions, [not] concretes."


인젝터블하다.
컨트롤러 외 로직은 프로바이더에 쓰면 된다.
```
---
```
[ module ]

// 컨트롤러와 프로바이더를 하나의 묶음으로 만들어 줌
// 다른 모듈에서 import 할 수 있음
// 모든 모듈은 루트 모듈로 향한다(앱의 시작점임)
@Module({
  imports: [RamenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

modules are strongly recommended as an effective way to organize your components. Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

The @Module() decorator takes a single object whose properties describe the module
- providers
- controllers
- imports
- exports

The module encapsulates providers by default. This means that it's impossible to inject providers that are neither directly part of the current module nor exported from the imported modules. Thus, you may consider the exported providers from a module as the module's public interface, or API.

modules are singletons by default
can share the same instance of any provider between multiple modules effortlessly.
can be reused by any module. 

export한 것은 다른 모듈에서도 접근할 수 있게 된다
import한 모듈 그대로 export할 수 있다
-> 유연하게 재사용 가능

If you have to import the same set of modules everywhere,
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}

Global modules should be registered only once, generally by the root or core module.

Making everything global is not a good design decision. 

모듈이 nest js의 핵심이구만!
```
---
```
[ middleware ]
equivalent to express middleware
You implement custom Nest middleware in either a function, or in a class with an @Injectable() decorator. 
The class should implement the NestMiddleware interface, while the function does not have any special requirements.

```
---
```
[ exception handler ]
익셉션을 핸들링함
마찬가지로 디펜던씨 인젝션 시스템에 의거한 사용 필요
필요하면 문서 다 시 보시오
```
---

```
[ pipe ]

컨트롤러 가기 전 끼어들어서 리퀘스트 인풋 인자(body, query, param, custom) 관리 가능

Built-in pipes#
Nest comes with nine pipes available out-of-the-box:

ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
ParseFilePipe

커스텀도 가능

zod 를 쓰면 스키마베이스 발리데이션도 가능

class-validator, class-transformer를 쓰면 클래스 필드에 데코레이터로 발리데이션 가능

import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

```
```
그 밖에
guard, interceptor 있음.
```
