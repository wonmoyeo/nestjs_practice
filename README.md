# 원모의 네스트제이에스 연습

> 갤로핑을 위한 작업의 일환

```
[ 연습 목표 ]
[ ~ ] common(routing, validation 등등)
[ ~ ] mongoDB (orm? drm?)
[ ~ ] NCP object storage

- 이미지 정보를 데이터베이스에 저장하고 스토리지에 업로드하긔를 해보자
```

## 메모
```
[ Controller ]
In order to create a basic controller, we use classes and decorators

컨벤션? 규칙?
directory 명 -> route prefix -> @Controller('directory명')
directory 안에 controller, service, entity, DTO 등등 관련 있는 것끼리 모아놓기
DTO 개념을 적극 사용 -> class를 사용하기를 권장(js로 트랜스파일링 될 때 살아남을 수 있으므로...)

Controllers always belong to a module
```
### 공식문서 샘플
```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
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

```